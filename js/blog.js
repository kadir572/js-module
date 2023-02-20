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

const getImageUrl = user => {
  const surname = user.name.split(' ')[1]
  return `https://robohash.org/${surname}`
}

const createPosts = postsList => {
  const posts = document.createElement('ul')
  posts.classList.add('posts')
  postsList.forEach((post, index) => {
    if (index >= users.length) return
    const li = document.createElement('li')
    li.appendChild(createPost(post, users[index]))
    posts.appendChild(li)
  })

  return posts
}

const createPost = (singlePost, user) => {
  const post = document.createElement('article')
  post.classList.add('post')

  const postHeader = document.createElement('div')
  postHeader.classList.add('post__header')

  const title = document.createElement('h2')

  title.textContent =
    singlePost.title.length >= 50
      ? `${singlePost.title.substring(50, 0)}...`
      : `${singlePost.title}`

  const image = document.createElement('img')
  image.src = getImageUrl(user)

  const imageFrame = document.createElement('div')
  imageFrame.classList.add('post__image__frame')
  imageFrame.appendChild(image)

  postHeader.appendChild(title)
  postHeader.appendChild(imageFrame)

  const postBody = document.createElement('p')
  postBody.classList.add('post__body')
  postBody.textContent = `${singlePost.body.substring(150, 0)}...`

  const postFooter = document.createElement('span')
  postFooter.classList.add('post__footer')
  postFooter.textContent = `by ${user.name}`

  post.appendChild(postHeader)
  post.appendChild(postBody)
  post.appendChild(postFooter)

  return post
}

window.addEventListener('load', async () => {
  posts = await getPosts()
  users = await getUsers()
  const main = document.querySelector('.main__container')
  main.appendChild(createPosts(posts))
})
