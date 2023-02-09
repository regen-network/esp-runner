SELECT doc
FROM signed_documents
WHERE signer = ?registry
    AND doc_type = 'regenregistry:ProjectDescription' AND doc->'project' = ?proj;

