import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  beforeEach(() => {
    const blog = {
      title: 'Test title',
      author: 'Test author',
      url: 'TestUrl.com',
    };

    render(<Blog blog={blog} />);
  });

  test('renders the blogs title and author', () => {
    const element = screen.getByText('Test title Test author');
    expect(element).toBeDefined();
  });

  test('does not render its url or number of likes by default', () => {
    expect(screen.queryByText('testurl.com')).toBeNull();
    expect(screen.queryByText('likes 0')).toBeNull();
  });
});
