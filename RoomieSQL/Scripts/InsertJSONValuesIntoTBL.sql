DO $$ 
DECLARE 
    jsonDataArrayText TEXT;
    jsonDataArray JSONB[];
    jsonData JSONB;
BEGIN 
    
    jsonDataArrayText := '[JSON Here]';

    -- Convert the JSON array text to a JSONB array
    jsonDataArray := ARRAY(SELECT json_array_element::JSONB 
                           FROM jsonb_array_elements(jsonDataArrayText::JSONB) AS json_array_element);

    -- Iterate over the JSON array and insert data
    FOR jsonData IN SELECT * FROM unnest(jsonDataArray) -- Example inserting locations into location table. 
    LOOP
        INSERT INTO public."LocationTBL" ("LocationValue", "County")
        VALUES (
            (jsonData->>'LocationValue')::VARCHAR(255),
            (jsonData->>'County')::VARCHAR(255)
        );
    END LOOP;
END $$;