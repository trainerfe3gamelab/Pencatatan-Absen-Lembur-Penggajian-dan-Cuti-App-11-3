import React from 'react'
import './pagination.css'

const pagination = () => {
    return (
        <div class="pagination">
            <a class="pagination-newer" href="#"><i class='bi bi-chevron-double-left'></i></a>
            <span class="pagination-inner">
                <a href="#">1</a>
                <a class="pagination-active" href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">6</a>
            </span>
            <a class="pagination-older" href="#"><i class='bi bi-chevron-double-right'></i></a>
        </div>
    )
}

export default pagination
