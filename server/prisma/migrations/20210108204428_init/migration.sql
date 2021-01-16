/*
  Warnings:

  - The migration will change the primary key for the `Yatzy` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Yatzy` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "usedRows" TEXT NOT NULL,
    "yatzyId" TEXT,
    FOREIGN KEY ("yatzyId") REFERENCES "Yatzy" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Yatzy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "turn" INTEGER NOT NULL DEFAULT 0,
    "throwCount" INTEGER NOT NULL DEFAULT 0,
    "dice" TEXT NOT NULL DEFAULT '[]'
);
INSERT INTO "new_Yatzy" ("id") SELECT "id" FROM "Yatzy";
DROP TABLE "Yatzy";
ALTER TABLE "new_Yatzy" RENAME TO "Yatzy";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
