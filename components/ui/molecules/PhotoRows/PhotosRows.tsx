import { ColumnProps } from '@/types'
import data from '@/data/data.json'
import PhotosColumns from '../PhotoColumns/PhotosColumn'

const PhotosRows = ({ rows }: any) => {
    return (
        <div>
            {rows.map(() => {
                return <PhotosColumns column={data.galery} />
            })}
        </div>
    )
}

export default PhotosRows
