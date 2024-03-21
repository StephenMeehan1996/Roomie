-- FUNCTION: public.roomiedeletead(integer, integer, integer)

-- DROP FUNCTION IF EXISTS public.roomiedeletead(integer, integer, integer);

CREATE OR REPLACE FUNCTION public.roomiedeletead(
	id integer,
	in_type integer,
	in_preference_set integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
	DELETE FROM 
		public."AddAddressTBL" 
    WHERE
		"AddID" = id;
		
	DELETE FROM 
		public."CommonAddDetailsTBL" 
    WHERE
		"AddID" = id;
		
	DELETE FROM 
		public."AddImageTBL" 
    WHERE
		"AddID" = id;
		
	DELETE FROM 
		public."AdApplicationTBL" 
    WHERE
		"AdID" = id;
		
    -- Perform conditional deletes based on AddType
    CASE In_Type
        WHEN 1 THEN
            -- Insert into HouseShareAddTBL
			DELETE FROM 
				public."HouseShareAddTBL" 
			WHERE
				"AddID" = id;
            
        WHEN 2 THEN
				DELETE FROM 
					public."HouseRentalAddTBL" 
				WHERE
					"AddID" = id;
        WHEN 3 THEN
			DELETE FROM 
				public."DigsAddTBL" 
			WHERE
				"AddID" = id;
    END CASE;
	
	IF In_Preference_Set = 1 THEN
		 DELETE FROM 
				public."CommonPreferenceTBL" 
			WHERE
				"AddID" = id;
	END IF;
	
    IF in_type = 1 THEN
		  DELETE FROM 
				public."RoomiePreferenceTBL" 
		  WHERE
			   "AddID" = id;
    END IF;
	
	DELETE FROM 
		public."AddTBL" 
    WHERE
		"AddID" = id;
  
    RAISE NOTICE 'Ad with ID % has been deleted', id;
END;
$BODY$;

ALTER FUNCTION public.roomiedeletead(integer, integer, integer)
    OWNER TO postgres;
