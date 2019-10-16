import Layout from '../components/Layout';
import Link from 'next/link';

const PostLink = ({ post }) => (
    <li>
        <Link href="/post/[id]" as={`/post/${post.id}`}>
            <a>{post.title}</a>
        </Link>
        <style jsx>{`
            li {
                list-style: none;
                margin: 5px 0;
            }

            a {
                margin: 0;
                transition: margin 0.1s ease;
            }

            a:hover {
                opacity: 0.9;
                margin-left: 10px;
            }
        `}</style>
    </li>
);

export default function Index() {
    const links = [
        { id: 'laundry-schedule', title: 'Laundry Schedule' },
        { id: 'communal-spendings', title: 'Communal Spendings' },
        { id: 'bin-rota', title: 'Bin Rota' }
    ];

    return (
        <Layout>
            <h2>Dashboard</h2>
            <ul>
                {links.map(post => (
                    <PostLink key={post.id} post={post} />
                ))}
            </ul>
            <style jsx>{`
                ul {
                    padding: 0;
                }
            `}</style>
        </Layout>
    );
}
