CREATE OR REPLACE FUNCTION public.roomiegetlocationdetails(
	)
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
		public."LocationTBL";
END;
$BODY$;

ALTER FUNCTION public.roomiegetlocationdetails()
    OWNER TO postgres;
