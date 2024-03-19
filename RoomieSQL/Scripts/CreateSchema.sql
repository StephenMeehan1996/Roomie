-- script to create database
-- worked back from SP's and lambda functions after RDS Deleted 15/03/2024

CREATE TABLE "UserTBL" (
  "UserID" integer PRIMARY KEY,
  "Email" varchar,
  "FirstName" varchar,
  "SecondName" varchar,
  "Dob" date,
  "Gender" varchar,
  "SelectedPreferences" varchar,
  "ShareData" numeric,
  "ShareName" numeric,
  "Smoke" numeric,
  "UserIdentifier" uuid
);

CREATE TABLE "ProfileDetailTBL" (
  "ProfileDetailID" integer PRIMARY KEY,
  "UserID" integer,
  "Bio" varchar,
  "IntroVideoURL" varchar
);

CREATE TABLE "ProfileImageTBL" (
  "ProfileImageID" integer PRIMARY KEY,
  "UserID" integer,
  "ImageType" integer,
  "CurrentSelected" integer,
  "ImageUrl" varchar,
  "Filename" varchar
);

CREATE TABLE "OccupationTBL" (
  "OccupationID" integer PRIMARY KEY,
  "UserID" integer,
  "OccupationTitle" varchar,
  "OccupationDetail" varchar
);

CREATE TABLE "AddressTBL" (
  "AddressID" integer PRIMARY KEY,
  "UserID" integer,
  "AddressLine1" varchar,
  "AddressLine2" varchar,
  "County" varchar,
  "City" varchar,
  "Eircode" varchar
);

CREATE TABLE "ReviewTBL" (
  "ReviewID" integer PRIMARY KEY,
  "UserID" integer,
  "PositiveReviews" integer,
  "NegitiveReviews" integer,
  "NumReviews" integer
);

CREATE TABLE "ReviewDetailTBL" (
  "ReviewDetailID" integer PRIMARY KEY,
  "ReviewID" integer,
  "ReviewDate" date,
  "ReviewUser" varchar,
  "ReviewText" varchar
);

CREATE TABLE "RentalPreferencesTBL" (
  "RentalPreferencesID" integer PRIMARY KEY,
  "UserID" integer,
  "HouseSharePriceMax" integer,
  "HouseSharePriceMin" integer,
  "HouseShareRoomType" varchar,
  "HouseShareHouseType" integer,
  "HouseShareEnvoirnment" varchar,
  "HousemateExpect" varchar,
  "HouseRentalPriceMax" integer,
  "HouseRentalPriceMin" integer,
  "HouseRentalNumRooms" integer,
  "HouseRentalHouseType" varchar,
  "DigsPriceMax" integer,
  "DigsPriceMin" integer,
  "DigsRoomType" varchar,
  "DigsDays" varchar,
  "DigsMealsIncluded" varchar,
  "DigsHouseType" varchar
);

CREATE TABLE "ProfilePostTBL" (
  "PostID" integer PRIMARY KEY,
  "UserID" integer,
  "PostDate" date
);

CREATE TABLE "ProfilePostImageTBL" (
  "PostImageID" integer PRIMARY KEY,
  "PostID" integer,
  "ImageURL" varchar
);

CREATE TABLE "AddTBL" (
  "AddID" integer PRIMARY KEY,
  "AddType" integer,
  "PosterID" integer,
  "PostDate" date,
  "Price" money,
  "PosterUID" uuid
);

CREATE TABLE "AdApplicationTBL" (
  "AdApplicationID" integer PRIMARY KEY,
  "AdID" integer,
  "UserIdenifier" uuid,
  "Message" varchar,
  "Date" date
);

CREATE TABLE "AddAddressTBL" (
  "AddAddressID" integer PRIMARY KEY,
  "AddID" integer,
  "AddressLine1" varchar,
  "AddressLine2" varchar,
  "County" varchar,
  "City" varchar,
  "Eircode" varchar
);

CREATE TABLE "CommonAddDetailsTBL" (
  "CommonAddDetailID" integer PRIMARY KEY,
  "AddID" integer,
  "PropertyType" varchar,
  "Description" varchar,
  "ReferenceRequired" varchar,
  "Deposit" varchar,
  "PreferenceSet" integer
);

CREATE TABLE "CommonPreferenceTBL" (
  "CommonPreferenceID" integer PRIMARY KEY,
  "AddID" integer,
  "Gender" varchar,
  "AgeBracket" varchar,
  "Occupation" varchar,
  "OccupationDetail" varchar,
  "SmokingPermitted" integer
);

CREATE TABLE "HouseRentalAddTBL" (
  "HouseRentalID" integer PRIMARY KEY,
  "AddID" integer,
  "NumBedrooms" integer
);

CREATE TABLE "DigsAddTBL" (
  "DigsID" integer PRIMARY KEY,
  "AddID" integer,
  "CurrentOccupants" integer,
  "MealsProvided" integer,
  "DaysAvailable" varchar
);

CREATE TABLE "HouseShareAddTBL" (
  "HouseShareID" integer PRIMARY KEY,
  "AddID" integer,
  "RoomType" varchar,
  "Ensuite" integer,
  "CurrentOccupants" integer
);

CREATE TABLE "RoomiePreferenceTBL" (
  "RoomiePreferenceID" integer PRIMARY KEY,
  "AddID" integer,
  "HouseExpectation" varchar,
  "Envoirnment" varchar
);

CREATE TABLE "LocationTBL" (
  "LocationID" integer PRIMARY KEY,
  "LocationValue" varchar,
  "County" varchar
);

CREATE TABLE "UserPresavedMessageTBL" (
  "UserPresavedMessageID" integer PRIMARY KEY,
  "Date" date,
  "MessageTitle" varchar,
  "MessageBody" varchar,
  "UserID" numeric,
  "UserIdentifier" uuid
);

CREATE TABLE "ChatRecordTBL" (
  "ChatRecordID" integer PRIMARY KEY,
  "ChatID" uuid,
  "User1ID" uuid,
  "User2ID" uuid,
  "CreatedDate" date
);

CREATE TABLE "AddImageTBL" (
  "AddImageID" integer PRIMARY KEY,
  "AddID" integer,
  "ImageURL" varchar,
  "Filename" varchar,
  "IsFirstImage" numeric
);

ALTER TABLE "ProfileDetailTBL" ADD FOREIGN KEY ("UserID") REFERENCES "UserTBL" ("UserID");

ALTER TABLE "ProfileImageTBL" ADD FOREIGN KEY ("UserID") REFERENCES "UserTBL" ("UserID");

ALTER TABLE "OccupationTBL" ADD FOREIGN KEY ("UserID") REFERENCES "UserTBL" ("UserID");

ALTER TABLE "AddressTBL" ADD FOREIGN KEY ("UserID") REFERENCES "UserTBL" ("UserID");

ALTER TABLE "ReviewTBL" ADD FOREIGN KEY ("UserID") REFERENCES "UserTBL" ("UserID");

ALTER TABLE "RentalPreferencesTBL" ADD FOREIGN KEY ("UserID") REFERENCES "UserTBL" ("UserID");

ALTER TABLE "ProfilePostTBL" ADD FOREIGN KEY ("UserID") REFERENCES "UserTBL" ("UserID");

ALTER TABLE "AddTBL" ADD FOREIGN KEY ("PosterID") REFERENCES "UserTBL" ("UserID");

ALTER TABLE "HouseShareAddTBL" ADD FOREIGN KEY ("AddID") REFERENCES "AddTBL" ("AddID");

ALTER TABLE "DigsAddTBL" ADD FOREIGN KEY ("AddID") REFERENCES "AddTBL" ("AddID");

ALTER TABLE "HouseRentalAddTBL" ADD FOREIGN KEY ("AddID") REFERENCES "AddTBL" ("AddID");

ALTER TABLE "AddAddressTBL" ADD FOREIGN KEY ("AddID") REFERENCES "AddTBL" ("AddID");

ALTER TABLE "CommonAddDetailsTBL" ADD FOREIGN KEY ("AddID") REFERENCES "AddTBL" ("AddID");

ALTER TABLE "CommonPreferenceTBL" ADD FOREIGN KEY ("AddID") REFERENCES "AddTBL" ("AddID");

ALTER TABLE "AdApplicationTBL" ADD FOREIGN KEY ("AdID") REFERENCES "AddTBL" ("AddID");

ALTER TABLE "RoomiePreferenceTBL" ADD FOREIGN KEY ("AddID") REFERENCES "AddTBL" ("AddID");

ALTER TABLE "AddImageTBL" ADD FOREIGN KEY ("AddID") REFERENCES "AddTBL" ("AddID");

ALTER TABLE "ProfilePostImageTBL" ADD FOREIGN KEY ("PostImageID") REFERENCES "ProfilePostTBL" ("PostID");

ALTER TABLE "ReviewDetailTBL" ADD FOREIGN KEY ("ReviewID") REFERENCES "ReviewTBL" ("ReviewID");
