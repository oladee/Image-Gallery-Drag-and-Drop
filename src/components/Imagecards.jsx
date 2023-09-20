import React, {useRef} from 'react'
import { useDrag, useDrop } from 'react-dnd'

const type = "Image"

const Imagecards = ({src, alt, index, id, moveImage}) => {

  const ref = useRef(null)

  const[, drop] = useDrop({
    accept: type,
    hover(item){
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;

      const hoverIndex = index;

      if (dragIndex === hoverIndex) { 
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag(()=>({
    type:type,

    item: {id: id, index },

    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }))

  drag(drop(ref));

  return (
    <div className="card-profile w-[75%] transition duration-300 transform rounded shadow-lg hover:scale-90"
    ref={ref}
    style={{ opacity: isDragging ? 0 : 1 }}>
      <img src={src} alt={alt} className="card--img"/>
    </div>
  )
}

export default Imagecards
