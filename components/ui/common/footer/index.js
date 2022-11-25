export default function Footer() {
  return (
    <footer className="pt-1 bg-teal-900">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center mt-5">
          <div className="py-6">
            <p className="mb-6 text-sm font-bold text-white text-primary-2">
              © {new Date().getFullYear()} DeLearn
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
