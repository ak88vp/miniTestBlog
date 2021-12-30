package ak88.minitestblog.controller;

import ak88.minitestblog.model.Blog;
import ak88.minitestblog.model.Status;
import ak88.minitestblog.service.BlogService;
import ak88.minitestblog.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("api/blogs")
public class BlogController {
    @Autowired
    BlogService blogService;
    @Autowired
    StatusService statusService;

    @GetMapping("")
    public ResponseEntity<Iterable<Blog>> findAll(){
        Iterable<Blog> blogs= blogService.findAll();
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }
    @PostMapping("")
    public ResponseEntity<Blog> create(@RequestBody Blog blog){
        blog.setTime(LocalDateTime.now());
        blogService.save(blog);
        return new ResponseEntity<>(blog,HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Blog> update(@PathVariable Long id,@RequestBody Blog blog){
        blog.setId(id);
        blog.setTime(LocalDateTime.now());
        blogService.save(blog);
        return new ResponseEntity<>(blog,HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Blog> delete(@PathVariable Long id){
        blogService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Blog> findOne(@PathVariable Long id){
        Optional<Blog> blog=blogService.findById(id);
        return new ResponseEntity<>(blog.get(),HttpStatus.OK);
    }
    @GetMapping("public/{id}")
    public ResponseEntity<Iterable<Blog>> findAllPublic(@PathVariable Long id){
        Optional<Status> status=statusService.findById(id);
        Iterable<Blog> blogs=blogService.findAllByStatus(status.get());
        return new ResponseEntity<>(blogs,HttpStatus.OK);
    }


}
