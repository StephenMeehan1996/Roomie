CREATE OR REPLACE FUNCTION public.roomiegetdigs(
	in_location text)
    RETURNS TABLE(addid integer, addtype integer, posterid integer, postdate date, price numeric, addaddressid integer, addressline1 character varying, addressline2 character varying, county character varying, city character varying, eircode character varying, commonadddetailsid integer, propertytype character varying, description character varying, referencerequired integer, deposit character varying, preferenceset integer, currentoccupants integer, mealsprovided integer, daysavailable character varying, commonpreferenceid integer, agebracket character varying, gender character varying, occupation character varying, occupationdetail character varying, smokingpermitted integer) 
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
		D."CurrentOccupants",
		D."MealsProvided",
		D."DaysAvailable",
		CP."CommonPreferenceID",
		CP."AgeBracket",
		CP."Gender",
		CP."Occupation",
		CP."OccupationDetail",
		CP."SmokingPermitted"
    FROM public.
		"AddTBL" A
	JOIN 
		public."AddAddressTBL" AA ON AA."AddID" = A."AddID"
	JOIN
		public."CommonAddDetailsTBL" CA on CA."AddID" = A."AddID"
	JOIN
		public."DigsAddTBL" D ON D."AddID" = A."AddID"
	LEFT JOIN
		public."CommonPreferenceTBL" CP ON CP."AddID" = A."AddID"
	WHERE
		AA."County" = in_location;
END;
$BODY$;

ALTER FUNCTION public.roomiegetdigs(text)
    OWNER TO postgres;