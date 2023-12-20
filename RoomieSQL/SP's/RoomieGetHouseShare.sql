CREATE OR REPLACE FUNCTION public.roomiegethouseshare(
	in_location text)
    RETURNS TABLE(addid integer, addtype integer, posterid integer, postdate date, price numeric, addaddressid integer, addressline1 character varying, addressline2 character varying, county character varying, city character varying, eircode character varying, commonadddetailsid integer, propertytype character varying, description character varying, referencerequired integer, deposit character varying, preferenceset integer, roomtype character varying, ensuite integer, currentoccupants integer, commonpreferenceid integer, agebracket character varying, gender character varying, occupation character varying, occupationdetail character varying, smokingpermitted integer, houseexpectation character varying, envoirnment character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
	
    SELECT 
		A."AddID", 
		A."AddType", 
		A."PosterID", 
		A."PostDate", 
		A."Price", 
		AA."AddAddressID", 
		AA."AddressLine1", 
		AA."AddressLine2", 
		AA."County", 
		AA."City", 
		AA."Eircode",
		CA."CommonAddDetailsID",
		CA."PropertyType",
		CA."Description",
		CA."ReferenceRequired",
		CA."Deposit",
		CA."PreferenceSet",
		HS."RoomType",
		HS."Ensuite",
		HS."CurrentOccupants",
		CP."CommonPreferenceID",
		CP."AgeBracket",
		CP."Gender",
		CP."Occupation",
		CP."OccupationDetail",
		CP."SmokingPermitted",
		RP."HouseExpectation",
		RP."Envoirnment"
    FROM public.
		"AddTBL" A
	JOIN 
		public."AddAddressTBL" AA ON AA."AddID" = A."AddID"
	JOIN
		public."CommonAddDetailsTBL" CA on CA."AddID" = A."AddID"
	JOIN
		public."HouseShareAddTBL" HS ON HS."AddID" = A."AddID"
	LEFT JOIN
		public."CommonPreferenceTBL" CP ON CP."AddID" = A."AddID"
	LEFT JOIN
		public."RoomiePreferenceTBL" RP on RP."AddID" = A."AddID"
	WHERE
		AA."County" = in_location;
END;
$BODY$;

ALTER FUNCTION public.roomiegethouseshare(text)
    OWNER TO postgres;