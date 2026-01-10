/*
  Warnings:

  - You are about to drop the column `email` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `guestEmail` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "checkInDate" TEXT NOT NULL,
    "checkOutDate" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hotelId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Booking_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("checkInDate", "checkOutDate", "createdAt", "guests", "hotelId", "id") SELECT "checkInDate", "checkOutDate", "createdAt", "guests", "hotelId", "id" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
