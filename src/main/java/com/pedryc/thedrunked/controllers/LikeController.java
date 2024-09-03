package com.pedryc.thedrunked.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pedryc.thedrunked.services.LikeService;

@RestController
public class LikeController {
    LikeService likeService;
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/user/like")
    public ResponseEntity<?> likeCocktail(@RequestParam long cocktailId) {
        try{
            likeService.likeCocktail(cocktailId);
            return ResponseEntity.ok().build();
        } catch(IllegalArgumentException error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        } catch(IllegalStateException error) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error.getMessage());
        } catch(Exception error) {
            return ResponseEntity.internalServerError().body(error.getMessage());
        }
    }

    @PostMapping("user/unlike")
    public ResponseEntity<?> unlikeCocktail(@RequestParam long cocktailId) {
        try {
            likeService.unlikeCocktail(cocktailId);
            return ResponseEntity.ok().build();
        } catch(IllegalArgumentException error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        } catch(IllegalStateException error) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error.getMessage());
        } catch(Exception error) {
            return ResponseEntity.internalServerError().body(error.getMessage());
        }
    }


    @GetMapping("/user/like/count")
    public ResponseEntity<?> countLikes(@RequestParam Long cocktailId) {
        try {
           Long count = likeService.getCocktailLikesCount(cocktailId);
            return ResponseEntity.ok(count);
        } catch(IllegalArgumentException error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        } catch(IllegalStateException error) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error.getMessage());
        } catch(Exception error) {
            return ResponseEntity.internalServerError().body(error.getMessage());
        }
    }
}
