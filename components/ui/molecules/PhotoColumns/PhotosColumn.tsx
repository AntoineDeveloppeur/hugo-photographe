import { ColumnProps } from '@/types'
import Photo from '../../atoms/Photo/Photo'

const PhotosColumns = ({ column }: any) => {
    return (
        <div>
            {column.map((pic) => {
                return <Photo photo={pic} />
            })}
        </div>
    )
}

export default PhotosColumns
