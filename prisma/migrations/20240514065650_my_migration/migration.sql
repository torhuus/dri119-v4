/*
  Warnings:

  - The values [HENDELSESSTYRING] on the enum `Area` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Area_new" AS ENUM ('SERVICESENTER', 'PROBLEMSTYRING', 'ENDRINGSKONTROLL', 'KAPASITET_OG_YTELSESSTYRING');
ALTER TABLE "Ticket" ALTER COLUMN "area" DROP DEFAULT;
ALTER TABLE "Ticket" ALTER COLUMN "area" TYPE "Area_new" USING ("area"::text::"Area_new");
ALTER TYPE "Area" RENAME TO "Area_old";
ALTER TYPE "Area_new" RENAME TO "Area";
DROP TYPE "Area_old";
ALTER TABLE "Ticket" ALTER COLUMN "area" SET DEFAULT 'SERVICESENTER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";
