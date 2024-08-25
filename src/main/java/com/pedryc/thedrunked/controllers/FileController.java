package com.pedryc.thedrunked.controllers;

import java.io.IOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileController {
    
    @GetMapping("/user/file/{fileName}")
    public ResponseEntity<byte[]> file(@PathVariable String fileName) {

        if (!fileName.matches("[a-zA-Z0-9_-]+\\.(jpg|jpeg|png)")) {
            return ResponseEntity.badRequest().body("Invalid file name".getBytes());
        }

        try {
            ClassPathResource imageFile = new ClassPathResource("images/cocktailImages/" + fileName);

            if (!imageFile.exists()) {
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = StreamUtils.copyToByteArray(imageFile.getInputStream());

            MediaType mediaType = getMediaTypeForFileName(fileName);

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(imageBytes);

        } catch(IOException error) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while reading the file".getBytes());
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