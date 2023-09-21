import {useRef} from 'react'
import { useDrag, useDrop } from 'react-dnd'

const type = "Imagecards"

const Imagecards = ({src, alt, index, id, moveImage}) => {

  const ref = useRef(null)

  const[{isOver}, drop] = useDrop({
    accept: type,
    collect: (monitor) =>({
      isOver:!!monitor.isOver()
    }),
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
    <div className="card-profile w-[75%] h-300px transition duration-300 transform rounded shadow-lg hover:scale-90 cursor-move md:w-[100%] ml-5"
    ref={ref}
    style={{ opacity: isDragging ? 0 : 1, }}>
      <img src={src} alt={alt} className="card--img"/>
    </div>
  )
}

export default Imagecards
