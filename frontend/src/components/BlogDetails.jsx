import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                console.error("Error fetching blog", err);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) return <p>Loading...</p>;

    return (
        <div style={{ padding: '2rem', color: 'white' }}>
            <h1 style={{
                fontWeight: "600",
                background: "linear-gradient(90deg, #00f5ff, #8a2be2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
            }}
            >
                {blog.title}
            </h1>
            <p>{blog.date}</p>
            <ul
                style={{
                    marginTop: "12px",
                    paddingLeft: "20px",
                    listStyleType: "disc",
                    textAlign: "left"
                }}
            >
                {blog.content
                    ?.split(/\d+\.\s/)
                    .filter(Boolean)
                    .map((point, index) => (
                        <li
                            key={index}
                            style={{
                                marginBottom: "10px",
                                lineHeight: "1.7"
                            }}
                        >
                            {point.trim()}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default BlogDetails;
