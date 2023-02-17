let posts
let users

const getPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const json = await response.json()
  return json
}

const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const json = await response.json()
  return json
}

const createPosts = postsList => {
  const posts = document.createElement('ul')
  posts.classList.add('posts')
  postsList.forEach(post => {
    const li = document.createElement('li')
    li.appendChild(createPost(post))
    posts.appendChild(li)
  })

  return posts
}

const createPost = singlePost => {
  const post = document.createElement('article')
  post.classList.add('post')
  const title = document.createElement('h2')
  title.textContent = `${singlePost.title}`
  post.appendChild(title)
  const body = document.createElement('p')
  body.textContent = `${singlePost.body.substring(150, 0)}...`
  post.appendChild(body)
  return post
}

window.addEventListener('load', async () => {
  posts = await getPosts()
  users = await getUsers()
  const main = document.querySelector('.main__container')
  main.appendChild(createPosts(posts))
})
