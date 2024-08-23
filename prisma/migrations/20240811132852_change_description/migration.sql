/*
  Warnings:

  - You are about to drop the column `keterangan` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `description` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `keterangan`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
