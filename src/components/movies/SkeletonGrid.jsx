import { Row, Col } from 'react-bootstrap'
import SkeletonCard from './SkeletonCard.jsx'

function SkeletonGrid({ count = 8 }) {
    return (
        <Row className='g-4'>
            { Array.from({ length: count }).map((_, index) => (
                <Col key={index} xs={6} md={4} lg={3}>
                    <SkeletonCard />
                </Col>
            )) }
        </Row>
    )
}

export default SkeletonGrid
