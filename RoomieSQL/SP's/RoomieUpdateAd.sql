-- FUNCTION: public.roomieupdatead(integer, numeric, text, text, numeric, text, numeric, numeric, text, numeric, numeric, numeric, text, text, text, text, text, numeric, text, text)

-- DROP FUNCTION IF EXISTS public.roomieupdatead(integer, numeric, text, text, numeric, text, numeric, numeric, text, numeric, numeric, numeric, text, text, text, text, text, numeric, text, text);

CREATE OR REPLACE FUNCTION public.roomieupdatead(
	in_type integer,
	in_id integer,
	in_price numeric,
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
    RETURNS VOID
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

BEGIN
   	
	UPDATE 
		public."AddTBL" 
    SET 
		"Price" = in_price
    WHERE 
		"AddID" = in_id;

	
	UPDATE 
		public."CommonAddDetailsTBL" 
    SET 
		"PropertyType" = in_property_type,
		"Description" = in_description,
		"ReferenceRequired" = in_reference_required,
		"Deposit" = in_deposit,
		"PreferenceSet" = in_preference_set
    WHERE 
		"AddID" = in_id;

    -- Perform conditional inserts based on AddType
    CASE in_type
        WHEN 1 THEN
		
			UPDATE 
				public."HouseShareAddTBL" 
			SET 
				"RoomType" = in_room_type,
				"Ensuite" = in_ensuite,
				"CurrentOccupants" = in_current_occupants
			WHERE 
				"AddID" = in_id;

        WHEN 2 THEN
			
			UPDATE 
				public."HouseRentalAddTBL" 
			SET 
				"NumBedrooms" = in_num_bedrooms
			WHERE 
				"AddID" = in_id;
		
        WHEN 3 THEN
     			
			UPDATE 
				public."DigsAddTBL" 
			SET 
				"CurrentOccupants" = in_current_occupants,
				"MealsProvided" = in_meals_provided,
				"DaysAvailable" = in_days_available
			WHERE 
				"AddID" = in_id;
    END CASE;
	
	IF in_preference_set = 1 THEN	
				
		 	UPDATE 
				public."CommonPreferenceTBL"
			SET 
				"Gender" = in_gender,
				"AgeBracket" = in_age_bracket,
				"Occupation" = in_occupation,
				"OccupationDetail" = in_occupation_detail,
				"SmokingPermitted" = in_smokingpermitted
			WHERE 
				"AddID" = in_id;
				
		 IF in_type = 1 THEN
			
			UPDATE 
				public."RoomiePreferenceTBL" 
			SET 
				"Envoirnment" = in_house_expectation,
				"HouseExpectation" = in_envoirnment
			WHERE 
				"AddID" = in_id;
				
		 END IF;
	END IF;
END;
$BODY$;

ALTER FUNCTION public.roomieupdatead(integer,integer, numeric, text, text, numeric, text, numeric, numeric, text, numeric, numeric, numeric, text, text, text, text, text, numeric, text, text)
    OWNER TO postgres;
