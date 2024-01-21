-- FUNCTION: public.roomieinsertad(integer, integer, uuid, date, numeric, text, text, text, text, text, text, text, numeric, text, numeric, numeric, text, numeric, numeric, numeric, text, text, text, text, text, numeric, text, text)

-- DROP FUNCTION IF EXISTS public.roomieinsertad(integer, integer, uuid, date, numeric, text, text, text, text, text, text, text, numeric, text, numeric, numeric, text, numeric, numeric, numeric, text, text, text, text, text, numeric, text, text);

CREATE OR REPLACE FUNCTION public.roomieinsertad(
	in_type integer,
	in_poster_id integer,
	in_posteruid uuid,
	in_post_date date,
	in_price numeric,
	in_address_line1 text,
	in_address_line2 text,
	in_county text,
	in_city text,
	in_eircode text,
	in_property_type text,
	in_description text,
	in_reference_required numeric,
	in_deposit text,
	in_preference_set numeric,
	in_current_occupants numeric DEFAULT NULL::numeric,
	in_room_type text DEFAULT NULL::text,
	in_ensuite numeric DEFAULT NULL::numeric,
	in_num_bedrooms numeric DEFAULT NULL::numeric,
	in_meals_provided numeric DEFAULT NULL::numeric,
	in_days_available text DEFAULT NULL::text,
	in_gender text DEFAULT NULL::text,
	in_age_bracket text DEFAULT NULL::text,
	in_occupation text DEFAULT NULL::text,
	in_occupation_detail text DEFAULT NULL::text,
	in_smokingpermitted numeric DEFAULT NULL::numeric,
	in_house_expectation text DEFAULT NULL::text,
	in_envoirnment text DEFAULT NULL::text)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    v_add_id integer;
BEGIN
    INSERT INTO 
		public."AddTBL" ("AddType", "PosterID", "PostDate", "Price", "PosterUID")
    VALUES 
		(in_type, in_poster_id, in_post_date, in_price, in_posterUID)
    RETURNING 
		"AddID" INTO v_add_id;

    -- Insert into AddAddressTBL
    INSERT INTO 
		public."AddAddressTBL" ("AddID", "AddressLine1", "AddressLine2", "County", "City", "Eircode")
    VALUES 
		(v_add_id, in_address_line1, in_address_line2, in_county, in_city, in_eircode);
	--Insert into common detail	
	INSERT INTO 
		public."CommonAddDetailsTBL" ("AddID","PropertyType","Description","ReferenceRequired","Deposit","PreferenceSet")
    VALUES 
		(v_add_id, in_property_type, in_description, in_reference_required, in_deposit, in_preference_set);

    -- Perform conditional inserts based on AddType
    CASE in_type
        WHEN 1 THEN
            -- Insert into HouseShareAddTBL
            INSERT INTO 
				public."HouseShareAddTBL" ("AddID","RoomType","Ensuite","CurrentOccupants")
            VALUES 
				(v_add_id, in_room_type,in_ensuite, in_current_occupants);
        WHEN 2 THEN
            -- Insert into HouseRentalTBL
            INSERT INTO 
				public."HouseRentalAddTBL" ("AddID","NumBedrooms")
            VALUES 
				(v_add_id, in_num_bedrooms);
        WHEN 3 THEN
            -- Insert into DigsAddTBL
            INSERT INTO 
				public."DigsAddTBL" ("AddID", "CurrentOccupants","MealsProvided","DaysAvailable")
            VALUES 
				(v_add_id, in_current_occupants, in_meals_provided, in_days_available);
    END CASE;
	
	IF in_preference_set = 1 THEN
		 --insert in common preference
		 INSERT INTO 
				public."CommonPreferenceTBL" ("AddID","Gender","AgeBracket","Occupation","OccupationDetail","SmokingPermitted")
            VALUES 
				(v_add_id, in_gender, in_age_bracket, in_occupation, in_occupation_detail, in_smokingpermitted);
		 --if house share add extra fields to Roomie Preference
		 IF in_type = 1 THEN
		 	 INSERT INTO 
				public."RoomiePreferenceTBL" ("AddID","Envoirnment","HouseExpectation")
            VALUES 
				(v_add_id, in_envoirnment, in_house_expectation);
		 END IF;
	END IF;
	
	RETURN v_add_id;
END;
$BODY$;

ALTER FUNCTION public.roomieinsertad(integer, integer, uuid, date, numeric, text, text, text, text, text, text, text, numeric, text, numeric, numeric, text, numeric, numeric, numeric, text, text, text, text, text, numeric, text, text)
    OWNER TO postgres;
