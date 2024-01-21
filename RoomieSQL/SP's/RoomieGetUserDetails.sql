CREATE OR REPLACE FUNCTION public.roomiegetuserdetails(
	id uuid)
    RETURNS TABLE(_userid integer, email character varying, firstname character varying, secondname character varying, dob date, gender character varying, selectedpreferences character varying, sharedata integer, sharename integer, smoke integer, useridentifier uuid, bio character varying, introvideourl character varying, addressid integer, addressline1 character varying, addressline2 character varying, county character varying, city character varying, eircode character varying, reviewid integer, positivereview integer, negitivereviews integer, numreviews integer, housesharepricemax integer, housesharepricemin integer, houseshareroomtype character varying, houseshareenvoirnment character varying, houserentalpricemax integer, houserentalpricemin integer, houserentalnumrooms integer, houserentalhousetype character varying, digspricemax integer, digspricemin integer, digsroomtype character varying, digsdays character varying, digsmealsincluded integer, digshousetype character varying, housemateexpact character varying, housesharehousetype character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT 
		U."UserID",
		U."Email",
		U."FirstName",
		U."SecondName",
		U."Dob",
		U."Gender",
		U."SelectedPreferences", 
		U."ShareData",
		U."ShareName",
		U."Smoke",
		U."UserIdentifier",
		PD."Bio",
		PD."IntroVideoURL",
		A."AddressID",
		A."AddressLine1",
		A."AddressLine2",
		A."County",
		A."City",
		A."Eircode", 
		R."ReviewID",
		
		R."PositiveReviews",
		R."NegitiveReviews", 
		R."NumReviews",
		RP."HouseSharePriceMax",
		RP."HouseSharePriceMin",
		RP."HouseShareRoomType", --
		RP."HouseShareEnvoirnment",
		RP."HouseRentalPriceMax",
		RP."HouseRentalPriceMin",
		RP."HouseRentalNumRooms",
		RP."HouseRentalHouseType",
		RP."DigsPriceMax",
		RP."DigsPriceMin", 
		RP."DigsRoomType",
		RP."DigsDays",
		RP."DigsMealsIncluded",
		RP."DigsHouseType",
		RP."HousemateExpect",
		RP."HouseRentalHouseType"
    FROM
        public."UserTBL" U
		
		INNER JOIN 
			public."AddressTBL" A ON A."UserID" = U."UserID"
		INNER JOIN
			public."ReviewTBL" R ON R."UserID" = U."UserID"
		LEFT JOIN
        	public."ProfileDetailTBL" PD ON PD."UserID" = U."UserID"
		LEFT JOIN
			public."RentalPreferencesTBL" RP ON RP."UserID" = U."UserID"
    WHERE -- b8cf3efc-96f5-4cd5-90cf-3d342a8e124a
        U."UserIdentifier" = Id;
END;
$BODY$;

ALTER FUNCTION public.roomiegetuserdetails(uuid)
    OWNER TO postgres;
