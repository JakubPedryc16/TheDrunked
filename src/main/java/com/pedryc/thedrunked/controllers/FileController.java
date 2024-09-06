package com.pedryc.thedrunked.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
public class FileController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping("/user/file")
    public ResponseEntity<byte[]> getFile(@RequestParam String type, @RequestParam String filename) {

        if (!filename.matches("[a-zA-Z0-9_-]+\\.(jpg|jpeg|png)")) {
            return ResponseEntity.badRequest().body("Invalid file name, Accepted extensions .jpg .jpeg .png".getBytes());
        }

        try {
            Path filePath = Paths.get(uploadDir).resolve(type).resolve(filename);

            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = Files.readAllBytes(filePath);

            MediaType mediaType = getMediaTypeForFileName(filename);

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(imageBytes);

        } catch(IOException error) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while reading the file".getBytes());
        }
    } 

    @PostMapping("/user/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload.");
        }
        try {
            String originalFileName = file.getOriginalFilename();

            String sanitizedFileName = originalFileName.replaceAll("\\s+", "_");
    
            String uniqueFileName = UUID.randomUUID().toString() + "_" + sanitizedFileName;
    
            if (!uniqueFileName.matches("[a-zA-Z0-9_-]+\\.(jpg|jpeg|png)")) {
                return ResponseEntity.badRequest().body("Invalid file type. Only .jpg, .jpeg, and .png files are accepted.");
            }
    
            Path uploadPath = Paths.get(uploadDir).resolve("cocktail").resolve(uniqueFileName);
            Files.createDirectories(uploadPath.getParent());
            file.transferTo(uploadPath.toFile());
    
            return ResponseEntity.ok(uniqueFileName);
    
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while uploading the file.");
        }
    }
    private MediaType getMediaTypeForFileName(String fileName) {
        if (fileName.endsWith(".png")) {
            return MediaType.IMAGE_PNG;
        } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            return MediaType.IMAGE_JPEG;
        } else {
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }

}