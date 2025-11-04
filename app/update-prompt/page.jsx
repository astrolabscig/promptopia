'use client'

// ✅ Import Suspense to handle async client hooks like useSearchParams()
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

// ✅ Move all logic into a separate inner component
// so we can wrap it in Suspense below.
const EditPromptContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id'); // ✅ Corrected variable name

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

// ✅ Wrap the EditPromptContent component with Suspense
// to fix: "useSearchParams() should be wrapped in a suspense boundary"
const EditPrompt = () => {
  return (
    <Suspense fallback={<div>Loading prompt...</div>}>
      <EditPromptContent />
    </Suspense>
  );
};

export default EditPrompt;

/*
🧠 Summary:
- The warning happens because useSearchParams() runs async under the hood.
- Next.js requires a <Suspense> boundary around any component that uses it.
- We fixed this by:
  1️⃣ Moving the logic into EditPromptContent.
  2️⃣ Wrapping it with <Suspense> in the main component.
- The fallback ("Loading prompt...") is displayed temporarily while the URL params are resolved.
*/
