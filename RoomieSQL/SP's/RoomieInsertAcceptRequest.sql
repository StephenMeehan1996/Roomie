CREATE OR REPLACE FUNCTION public.roomieinsertacceptrequest(
	in_author_identifier uuid,
	in_subject_identifier uuid,
	in_ad_id integer,
	in_date date,
	in_rental_history_id uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    INSERT INTO 
		public."RentalHistoryTable" ("AuthorIdentifier","SubjectIdentifier","Status","AdID","Date","RentalHistoryUID")
    VALUES 
		(in_author_identifier,in_subject_identifier,0,in_ad_id,in_date,In_rental_history_id);
		
	PERFORM
		roomietoggleadstatus(in_ad_id);
END;
$BODY$;

ALTER FUNCTION public.roomieinsertacceptrequest(uuid, uuid, integer, date, uuid)
    OWNER TO postgres;
