export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between pt-24">
            This is test id: {params.id}
        </div>
    );
}