import bootFastify from './fastify';

// TODO: graceful shutdown
export async function shutdown() {
    process.exit(1);
}

export const boot = async () => {
    const app = await bootFastify();

    return app;
};
