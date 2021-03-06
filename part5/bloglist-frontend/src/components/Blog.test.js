import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let mockUpdate;
  beforeEach(() => {
    mockUpdate = jest.fn();
    const blog = {
      title: 'Test title',
      author: 'Test author',
      url: 'testUrl.com',
      likes: 0,
      user: {
        name: 'test user',
      },
    };

    render(<Blog blog={blog} updateBlog={mockUpdate} />);
  });

  test('renders the blogs title and author', () => {
    const element = screen.getByText('Test title Test author');
    expect(element).toBeDefined();
  });

  test('does not render its url or number of likes by default', () => {
    expect(screen.queryByText('testUrl.com')).toBeNull();
    expect(screen.queryByText('likes 0')).toBeNull();
  });

  test('blogs url and number of likes are shown after view button is clicked', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    expect(screen.getByText('testUrl.com')).toBeDefined();
    expect(screen.getByText('likes 0')).toBeDefined();
  });

  test('like button calls updateBlog Function', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockUpdate.mock.calls).toHaveLength(2);
  });
});
