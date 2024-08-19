package com.pedryc.thedrunked.repositories;

import com.pedryc.thedrunked.entities.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<TagEntity, Long> {
}
