
CREATE OR REPLACE FUNCTION public.roomieupdateuserdetails(
	uid uuid,
	in_share_data numeric,
	in_share_name numeric,
	in_smoke numeric,
	in_address_line1 text,
	in_address_line2 text,
	in_county text,
	in_city text,
	in_eircode text,
	in_bio text,
	in_occupation_title text,
	in_occupation_detail text)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	id INTEGER;

BEGIN
 	
	SELECT 
		"UserID" INTO id
    FROM 
		public."UserTBL"
    WHERE 
		"UserIdentifier" = uid;
  
	UPDATE 
		public."UserTBL" 
    SET 
		"ShareData" = in_share_data,
		"ShareName" = in_share_name,
		"Smoke" = in_smoke
    WHERE 
		"UserID" = id;
	
	UPDATE 
		public."AddressTBL" 
    SET 
		"AddressLine1" = in_address_line1,
		"AddressLine2" = in_address_line2,
		"County" = in_county,
		"City" = in_city,
		"Eircode" = in_eircode
    WHERE 
		"UserID" = id;
	
	UPDATE 
		public."ProfileDetailTBL" 
    SET 
		"Bio" = in_bio
    WHERE 
		"UserID" = id;
		
	UPDATE 
		public."OccupationTBL" 
    SET 
		"OccupationTitle" = in_occupation_title,
		"OccupationDetail" = in_occupation_detail
    WHERE 
		"UserID" = id;
END;
$BODY$;

ALTER FUNCTION public.roomieupdateuserdetails(uuid, numeric, numeric, numeric, text, text, text, text, text, text, text, text)
    OWNER TO postgres;
