package ak88.minitestblog.repository;

import ak88.minitestblog.model.Blog;
import ak88.minitestblog.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    Iterable<Blog> findAllByStatus(Status status);
    Iterable<Blog> findAllByTitleContaining(String title);
}
