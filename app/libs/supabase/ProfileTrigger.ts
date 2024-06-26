import postgres from "postgres";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is required");
}

const db = postgres(dbUrl);

const main = async () => {
  await db`
      create or replace function public.handle_new_user()
          returns trigger as $$
      begin
          insert into public.profile (id, lastname, firstname, birthdate, "createdAt", "updatedAt")
          values (new.id, new.raw_user_meta_data->>'lastname', new.raw_user_meta_data->>'firstname', TO_TIMESTAMP(new.raw_user_meta_data->>'birthdate', 'YYYY-MM-DD'), now(), now());
          return new;
      end;
      $$ language plpgsql security definer;`;

  await db`
      create or replace trigger on_auth_user_created
          after insert on auth.users
          for each row execute procedure public.handle_new_user();`;

  await db`
      create or replace function public.handle_user_delete()
          returns trigger as $$
      begin
          delete from auth.users where id = old.id;
          return old;
      end;
      $$ language plpgsql security definer;`;

  await db`
      create or replace trigger on_profile_user_deleted
          after delete on public.profile
          for each row execute procedure public.handle_user_delete();`;

  console.log("Finished adding triggers and functions for profile handling.");
  process.exit();
};

main().catch(console.error);
