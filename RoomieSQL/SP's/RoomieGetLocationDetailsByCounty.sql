CREATE OR REPLACE FUNCTION public.roomiegetlocationdetailsbycounty(
	in_county text)
    RETURNS TABLE(locationid integer, locationvalue text, county text) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT 
        "LocationID",
        	CASE
           	 WHEN 
			 	"LocationValue" = "County" 
			 THEN
              	"LocationValue"
           	 ELSE
              	  "LocationValue" || ', ' || "County"
        	 END AS 
				LocationValue,
        "County"
    FROM 
		public."LocationTBL" AS L
	WHERE
		L."County" = in_county;
END;
$BODY$;

ALTER FUNCTION public.roomiegetlocationdetailsbycounty(text)
    OWNER TO postgres;
