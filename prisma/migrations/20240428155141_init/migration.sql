-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL,
    "lastname" TEXT,
    "firstname" TEXT,
    "birthdate" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "familyId" UUID NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "completed_task" (
    "id" UUID NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" UUID NOT NULL,
    "profileId" UUID NOT NULL,

    CONSTRAINT "completed_task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_familyToprofile" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "family_code_key" ON "family"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_familyToprofile_AB_unique" ON "_familyToprofile"("A", "B");

-- CreateIndex
CREATE INDEX "_familyToprofile_B_index" ON "_familyToprofile"("B");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_task" ADD CONSTRAINT "completed_task_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_task" ADD CONSTRAINT "completed_task_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_familyToprofile" ADD CONSTRAINT "_familyToprofile_A_fkey" FOREIGN KEY ("A") REFERENCES "family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_familyToprofile" ADD CONSTRAINT "_familyToprofile_B_fkey" FOREIGN KEY ("B") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
