import { PageContainer } from '../../components/PageContainer';

export default function About() {
  return (
    <PageContainer>
      <h1 className="text-5xl font-bold mb-6 text-center">About Us</h1>
      <p className="text-xl text-center max-w-2xl">
        This is the about page. The dark mesh background is applied to all pages automatically.
      </p>
    </PageContainer>
  );
}

