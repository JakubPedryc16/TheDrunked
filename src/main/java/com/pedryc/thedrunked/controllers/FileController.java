package com.pedryc.thedrunked.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.awt.Graphics2D;

import java.io.ByteArrayOutputStream;

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
            String sanitizedFileName = originalFileName.replaceAll("[^a-zA-Z0-9_\\-\\.]", "_");
            String uniqueFileName = UUID.randomUUID().toString() + "_" + sanitizedFileName;
            byte[] resizedImageBytes = resizeImage(file, 800, 600);
    
            Path uploadPath = Paths.get(uploadDir).resolve("cocktail").resolve(uniqueFileName);
            Files.createDirectories(uploadPath.getParent());

            Files.write(uploadPath, resizedImageBytes);
    
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

    private byte[] resizeImage(MultipartFile file, int maxWidth, int maxHeight) throws IOException {
    BufferedImage originalImage = ImageIO.read(file.getInputStream());
    int originalWidth = originalImage.getWidth();
    int originalHeight = originalImage.getHeight();

    int newWidth = originalWidth;
    int newHeight = originalHeight;

    if (originalWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = (int) ((double) originalHeight * (maxWidth / (double) originalWidth));
    }

    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (int) ((double) originalWidth * (maxHeight / (double) originalHeight));
    }

    BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
    Graphics2D graphics2D = resizedImage.createGraphics();
    graphics2D.drawImage(originalImage, 0, 0, newWidth, newHeight, null);
    graphics2D.dispose();

    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    ImageIO.write(resizedImage, "jpg", outputStream);
    return outputStream.toByteArray();
}

}