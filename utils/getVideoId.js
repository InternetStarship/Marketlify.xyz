const getVideoId = url => {
  if (typeof url !== 'string') return null

  let videoId
  const youtubeRegex = /(?:youtube.com\/watch\?v=|youtu.be\/)([\w-]+)/
  const vimeoRegex = /(?:vimeo.com\/|player.vimeo.com\/video\/)([\d]+)/
  const wistiaRegex = /(?:wistia.com\/medias\/|wi.st\/)([\w]+)/

  if ((videoId = youtubeRegex.exec(url))) {
    return videoId[1]
  } else if ((videoId = vimeoRegex.exec(url))) {
    return videoId[1]
  } else if ((videoId = wistiaRegex.exec(url))) {
    return videoId[1]
  }

  return null
}

export default getVideoId
