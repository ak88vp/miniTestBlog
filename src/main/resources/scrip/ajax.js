function loadShowContent() {
    let html = `<div class="col-12" id="blogs"></div>`;
    document.getElementById('content').innerHTML = html;
    showList()
}

function showList() {
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/api/blogs",
        success: function (blogs) {
            console.log(blogs)
            let html = `<div class="row p-3">`;
            for (let i = 0; i < blogs.length; i++) {
                html += `<div class="col-4 p-3 ">
             <div class="card align-items-center" style="width: 18rem;">
            <img height="315" src="https://nld.mediacdn.vn/2014/me4-12509.jpg" class="card-img-top" alt="...">
           
                <a class="card-text" onclick="findOneSt(${blogs[i].id})" > ${blogs[i].title}</a>
            
        </div></div>`
            }
            html += `</div>`;
            document.getElementById('content').innerHTML = html;
        },
        error: function (error) {
            alert("lỗi b ưi")
        }
    })
}
function findOneSt(id){
    console.log(id);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/blogs/" + id,
        success: function (blog) {
            console.log(blog)
            document.getElementById("content").innerHTML = "<div class='row p-3'> <div class='col-2'><a href='' onclick=\"loadShowContent()\"> Quay lại</a> </div> <div class='col-8'><center>"  +
                "  <img class='girl' src=\"https://media.baodautu.vn/Images/chicuong/2019/07/27/mvl7y4jk.jpg\" alt=\"\">" + "<br>" +
                "<p>" + 'Tiêu đề   :   ' + blog.title + "</p>" +
                "<p>" + 'Ngày đăng   :   ' + blog.time + "</p>" +
                "<p>" + 'Nội dung  :   ' + blog.content + "</p>" +
                "<p>" + 'Chế độ  :   ' + blog.status.name + "</p>" +
                `<button class="btn btn-warning" href='' onclick='deleteBlog(${blog.id})'> Xóa</button> &nbsp &nbsp &nbsp  &nbsp` +
                `<button class="btn btn-warning"  onclick='showEdit(${blog.id})'> Edit </button></center></div> <div class='offset-2'></div></div>`

        }
    })
}
function showEdit(id){
    console.log(id)
    let str='';
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/api/blogs/"+id,
        success:function (blog){
            console.log(blog)
            str+=`<div>
  <div class="form-group ">
  <br>
    <label for="formGroupExampleInput">Tiêu đề</label>
    <input type="text" class="form-control" id="title" value="${blog.title}">
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Nội dung</label>
    <input type="text" class="form-control" id="content1" value="${blog.content}" >
  </div>
  <div class="form-group b-3">
  <label for="formGroupExampleInput2">Chế độ</label>
  <select id="idStatus" class="form-control ">\`;`

            $.ajax({
                type: "Get",
                url: "http://localhost:8080/api/blogs/status",
                success: function (status) {
                    console.log(status)
                    for (let i = 0; i < status.length; i++) {
                        str += ` <option value="${status[i].id}">${status[i].name}</option>`
                    }
                    str += '</select> <br>'+ ' <button class="btn btn-warning" onclick="saveEdit(' + blog.id + ')">Save</button> </div>'
                    document.getElementById("content").innerHTML = str
                }
            })

        },
        error: function (error) {
            console.log(error)
        }
    })
}
function saveEdit(id){
    let blog={
        title:document.getElementById("title").value,
        content:document.getElementById("content1").value,
        status: {
            id:document.getElementById("idStatus").value,
        }
    }
    console.log(blog)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' // quy định kiểu dữ liệu trả về là json cho backend sử lý
        },
        type: "Put",
        url: "http://localhost:8080/api/blogs/"+id,
        data: JSON.stringify(blog),// chuyển đổi dữ liệu từ js thành json .
        success: loadShowContent,
        error: function (error) {
            console.log(error)}
    })
}
function deleteBlog(id){
    console.log(id)
    if (confirm("Muốn xóa k nói 1 lời nào")) {
        $.ajax({
            type: "Delete",
            url: "http://localhost:8080/api/blogs/" + id,
            success: loadShowContent,
            error: function (error) {
                alert("tạch")
            }

        })
    } else findOneSt(id)
}
function showCreate(){
    let html = `<div class="col-12">
  <div class="form-group ">
  <br>
    <label for="formGroupExampleInput">Tiêu Đề</label>
    <input type="text" class="form-control" id="title" placeholder="Tiêu đề ?">
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Nội Dung</label>
    <input type="text" class="form-control" id="content1" placeholder="Nội dung">
  </div>
  <div class="form-group b-3">
  <label for="formGroupExampleInput2">Chế Độ</label>
  <select id="idStatus" class="form-control ">`;

    $.ajax({
        type: "Get",
        url: "http://localhost:8080/api/blogs/status",
        success: function (status) {
            console.log(status)
            for (let i = 0; i < status.length; i++) {
                html += ` <option value="${status[i].id}">${status[i].name}</option>`
            }
            html += '</select> <br> <button onclick="saveBlog()" class="btn btn-warning">Create</button></div>'
            document.getElementById("content").innerHTML = html;
        },
        error: function (error) {
            alert("sai lè")
        }
    })
}
function saveBlog(){
    let blog = {
        title: document.getElementById("title").value,
        content: document.getElementById("content1").value,
        status: {
            id: document.getElementById("idStatus").value
        }
    }
    console.log(blog)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/api/blogs",
        data: JSON.stringify(blog),
        success: function (blog) {
            alert("Thêm thành công nè  ! ! !")
            loadShowContent()
        },
        error: function (error) {
            console.log(error)
        }
    })
}
function findAllStatus(id){
    console.log(id)
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/blogs/public/"+id,
        success:function (blogs){
            let html = `<div class="row p-3">`;
            for (let i = 0; i < blogs.length; i++) {
                html += `<div class="col-4 p-3 ">
             <div class="card align-items-center" style="width: 18rem;">
            <img height="315" src="https://nld.mediacdn.vn/2014/me4-12509.jpg" class="card-img-top" alt="...">
           
                <a class="card-text" onclick="findOneSt(${blogs[i].id})" > ${blogs[i].title}</a>
            
        </div></div>`
            }
            html += `</div>`;
            document.getElementById('content').innerHTML = html;


        }
    })

}
function findByName() {
    let key = document.getElementById("key").value;
    console.log(key)
    $.ajax({
        type: "Get",
        url: "http://localhost:8080/api/blogs/search?key=" + key,
        success: function (blogs) {
            let html = `<div class="row p-3">`;
            for (let i = 0; i < blogs.length; i++) {
                html += `<div class="col-4 p-3 ">
             <div class="card align-items-center" style="width: 18rem;">
            <img height="315" src="https://nld.mediacdn.vn/2014/me4-12509.jpg" class="card-img-top" alt="...">
           
                <a class="card-text" onclick="findOneSt(${blogs[i].id})" > ${blogs[i].title}</a>
            
        </div></div>`;
            }
            html += `</div>`;
            document.getElementById('content').innerHTML = html;
        }
    })

}
