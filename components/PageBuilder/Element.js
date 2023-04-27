import findContentById from '@/utils/findContentById'
import getVideoId from '@/utils/getVideoId'
import { useState } from 'react'

export default function Elements({ element, data, style }) {
  const [elementData] = useState(findContentById(element.id, data.data.content))

  return (
    <>
      {elementData.type === 'headline' && (
        <h1
          id={element.properties.id}
          className={element.properties.class}
          style={style}
          dangerouslySetInnerHTML={{ __html: elementData.content }}
        ></h1>
      )}

      {elementData.type === 'subheadline' && (
        <h2
          id={element.properties.id}
          className={element.properties.class}
          style={style}
          dangerouslySetInnerHTML={{ __html: elementData.content }}
        ></h2>
      )}

      {elementData.type === 'paragraph' && (
        <p
          id={element.properties.id}
          className={element.properties.class}
          style={style}
          dangerouslySetInnerHTML={{ __html: elementData.content }}
        ></p>
      )}

      {elementData.type === 'button' && (
        <a
          id={element.properties.id}
          className={element.properties.class}
          href={element.properties.url}
          target={element.properties.target}
          style={style}
        >
          {elementData.content}
        </a>
      )}

      {elementData.type === 'list' && (
        <li id={element.properties.id} className={element.properties.class} style={style}>
          {elementData.content}
        </li>
      )}

      {elementData.type === 'image' && (
        <img
          id={element.properties.id}
          className={element.properties.class}
          style={style}
          src={element.properties.src}
          alt={element.properties.alt}
        />
      )}

      {elementData.type === 'video' && element.properties.type === 'html5' && (
        <div
          id={element.properties.id}
          className={element.properties.class + ' responsive-video'}
          style={style}
        >
          <div className="absolute top-0 left-0 w-full h-full cursor-pointer" style={{ zIndex: 999 }}></div>
          <video src={element.properties.src} controls={element.properties.controls} />
        </div>
      )}

      {elementData.type === 'video' && element.properties.type === 'youtube' && (
        <div
          id={element.properties.id}
          className={element.properties.class + ' responsive-video'}
          style={style}
        >
          <div
            className="absolute top-0 left-0 w-full h-full cursor-pointer"
            style={{ ...style, zIndex: 999 }}
          ></div>
          <iframe
            src={`https://www.youtube.com/embed/${getVideoId(element.properties.url)}`}
            allowFullScreen
          />
        </div>
      )}

      {elementData.type === 'video' && element.properties.type === 'vimeo' && (
        <div
          id={element.properties.id}
          className={element.properties.class + ' responsive-video'}
          style={style}
        >
          <div className="absolute top-0 left-0 w-full h-full cursor-pointer" style={{ zIndex: 99 }}></div>
          <iframe
            src={`https://player.vimeo.com/video/${getVideoId(element.properties.url)}`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      {elementData.type === 'video' && element.properties.type === 'wistia' && (
        <div className="responsive-video">
          <div className="absolute top-0 left-0 w-full h-full cursor-pointer" style={{ zIndex: 99 }}></div>
          <script
            src={`https://fast.wistia.com/embed/medias/${getVideoId(element.properties.url)}.jsonp`}
            async
          ></script>
          <script src={`https://fast.wistia.com/assets/external/E-v1.js`} async></script>
          <div
            class={`wistia_embed wistia_async_${getVideoId(element.properties.url)}`}
            videoFoam={true}
            playerColor="#51a3ff"
            style={style}
          >
            &nbsp;
          </div>
        </div>
      )}

      {elementData.type === 'icon' && (
        <i id={element.properties.id} className={`fa fa-${element.properties.icon}`} style={style} />
      )}

      {elementData.type === 'label' && (
        <label
          id={element.properties.id}
          className={element.properties.class}
          style={style}
          dangerouslySetInnerHTML={{ __html: elementData.content }}
        ></label>
      )}

      {elementData.type === 'input' && (
        <input
          id={element.properties.id}
          className={element.properties.class}
          style={style}
          type={element.properties.type}
          value={element.properties.value}
        />
      )}

      {elementData.type === 'textarea' && (
        <textarea
          id={element.properties.id}
          className={element.properties.class}
          style={style}
          value={element.properties.value}
        />
      )}

      {elementData.type === 'select' && (
        <select
          id={element.properties.id}
          className={element.properties.class}
          style={style}
          value={element.properties.value}
        >
          {elementData.options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {elementData.type === 'checkbox' && (
        <label htmlFor={element.properties.id} className={element.properties.class}>
          <input
            id={element.properties.id}
            type="checkbox"
            checked={element.properties.checked}
            onChange={element.properties.onChange}
          />
          {elementData.content}
        </label>
      )}

      {elementData.type === 'divider' && (
        <hr id={element.properties.id} className={element.properties.class} style={style} />
      )}
    </>
  )
}
