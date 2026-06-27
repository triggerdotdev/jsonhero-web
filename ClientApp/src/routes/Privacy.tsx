import { HomeFooter } from "~/components/Home/HomeFooter";
import { HomeHeader } from "~/components/Home/HomeHeader";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <HomeHeader />
      <main className="mx-3 my-6 max-w-3xl space-y-6 text-base leading-7">
        <h1 className="text-3xl font-bold">Privacy Notice</h1>
        <p className="font-bold">Last updated June 01, 2022</p>
        <p>
          This privacy notice for Stack Hero Limited describes how and why we
          might collect, store, use, and share information when you use JSON
          Hero or contact us.
        </p>
        <h2 className="text-xl font-bold">What Information Do We Collect?</h2>
        <p>
          We collect personal information that you voluntarily provide when you
          contact us or use the service. We may also collect device and usage
          information such as browser type, referring URLs, and activity in the
          service for security, operation, analytics, and reporting.
        </p>
        <h2 className="text-xl font-bold">How Do We Process Information?</h2>
        <p>
          We process information to provide, improve, and administer the
          service, communicate with you, prevent fraud, and comply with law. We
          process information when we have a valid legal basis to do so.
        </p>
        <h2 className="text-xl font-bold">When Do We Share Information?</h2>
        <p>
          We may share information in specific business situations, such as a
          merger, financing, or acquisition, or where required to comply with
          legal obligations.
        </p>
        <h2 className="text-xl font-bold">Cookies</h2>
        <p>
          We may use cookies and similar tracking technologies to access or
          store information. Most browsers allow you to remove or reject
          cookies, though doing so may affect service behavior.
        </p>
        <h2 className="text-xl font-bold">Your Rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct,
          delete, restrict, or object to processing of personal information. To
          exercise those rights or ask questions, contact hello@jsonhero.io.
        </p>
      </main>
      <HomeFooter />
    </div>
  );
}
