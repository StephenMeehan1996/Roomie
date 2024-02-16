CREATE OR REPLACE FUNCTION public.roomieupdatepresavedmessage(
	in_new_date date,
	in_new_message_title character varying,
	in_new_message_body character varying,
	in_id uuid,
	in_message_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    UPDATE public."UserPresavedMessageTBL" U
    SET
        "MessageTitle" = in_new_message_title,
        "MessageBody" = in_new_message_body,
        "Date" = in_new_date
    WHERE
        U."UsePresavedMessageID" = in_message_id;
		

END;
$BODY$;

ALTER FUNCTION public.roomieupdatepresavedmessage(date, character varying, character varying, uuid, integer)
    OWNER TO postgres;
