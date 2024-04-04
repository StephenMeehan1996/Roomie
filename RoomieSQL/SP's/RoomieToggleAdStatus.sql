-- FUNCTION: public.roomietoggleadstatus(integer)

-- DROP FUNCTION IF EXISTS public.roomietoggleadstatus(integer);

CREATE OR REPLACE FUNCTION public.roomietoggleadstatus(
	id integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    current_status INTEGER;
    new_status INTEGER;
BEGIN

    SELECT "Active" 
		INTO 
			current_status 
		FROM 
			public."AddTBL" 
		WHERE 
			"AddID" = id;

    IF current_status = 1 THEN
        new_status := 0;
    ELSE
        new_status := 1;
    END IF;

    
    UPDATE 
		public."AddTBL" 
	SET 
		"Active" = new_status 
	WHERE 
		"AddID" = id;
		
END;
$BODY$;

ALTER FUNCTION public.roomietoggleadstatus(integer)
    OWNER TO postgres;
