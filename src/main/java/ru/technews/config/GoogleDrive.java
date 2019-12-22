package ru.technews.config;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.common.collect.ImmutableList;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

@Service
public class GoogleDrive {
    private static final String APPLICATION_NAME = "Google Drive API Java";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final List<String> SCOPES = ImmutableList.of(DriveScopes.DRIVE_METADATA, DriveScopes.DRIVE,
            DriveScopes.DRIVE_APPDATA, DriveScopes.DRIVE_FILE);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

    public static final String postPhotoFolderId = "1nEjlNxT8Hy3jGb1wfBg1fSQBBYGnDPlD";
    public static final String userPhotoFolderId = "1c7BnCITAVfXDfOV1LPBpYUx2L4lHkxTg";

    public static final String defaultPostPhotoId = "1i85_5rMBoarvnIP9OjphSNbi_lonUFiN";
    public static final String defaultProfilePhotoId = "1F4ksE_jqSPTdl075o85mL6F-ZZakD8fz";

    private Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        InputStream in = GoogleDrive.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

    private Drive getDrive() throws IOException, GeneralSecurityException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        return new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    public String uploadPhoto(MultipartFile photo, String folderId, String photoId, Boolean isUpdate) throws IOException, GeneralSecurityException {
        if (isUpdate && !photoId.equals(defaultPostPhotoId) && !photoId.equals(defaultProfilePhotoId))
            getDrive().files().delete(photoId).execute();

        File fileMetadata = new File();
        fileMetadata.setName(photo.getOriginalFilename());
        fileMetadata.setParents(Collections.singletonList(folderId));
        java.io.File filePath = new java.io.File(System.getProperty("java.io.tmpdir") + "/" + photo.getOriginalFilename());
        photo.transferTo(filePath);
        FileContent mediaContent = new FileContent("image/jpeg", filePath);
        File file = getDrive().files().create(fileMetadata, mediaContent)
                .setFields("id, webContentLink, webViewLink, parents")
                .execute();
        System.out.println("https://drive.google.com/uc?export=view&id=" + file.getId());

        return file.getId();
    }
}
