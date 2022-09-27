import { Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { initilizeBlogs } from '../reducers/blogReducer';

const BlogList = () => {
  const dispatch = useDispatch();
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  const blogs = useSelector(({ blog }) => [...blog].sort(byLikes));

  useEffect(() => {
    dispatch(initilizeBlogs());
  }, []);

  return (
    <Table>
      <TableBody>
        {blogs.map(blog => (
          <TableRow key={blog.id}>
            <TableCell>
              <Link
                to={`blogs/${blog.id}`}
                style={{
                  minWidth: '100%',
                  minHeight: '100%',
                  color: 'inherit',
                  textDecoration: 'inherit'
                }}
              >
                <Button>
                  {blog.title} {blog.author}
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BlogList;
