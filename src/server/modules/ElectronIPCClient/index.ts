import { CreateFileParams, ElectronIpcClient, FileMetadata } from '@lobechat/electron-server-ipc';

// 使用主项目的 package.json 或者一个默认的应用名称
const packageJSON = { name: '@lobehub/chat' };

class LobeHubElectronIpcClient extends ElectronIpcClient {
  // 获取数据库路径
  getDatabasePath = async (): Promise<string> => {
    return this.sendRequest<string>('getDatabasePath');
  };

  // 获取用户数据路径
  getUserDataPath = async (): Promise<string> => {
    return this.sendRequest<string>('getUserDataPath');
  };

  getDatabaseSchemaHash = async () => {
    return this.sendRequest<string>('setDatabaseSchemaHash');
  };

  setDatabaseSchemaHash = async (hash: string | undefined) => {
    if (!hash) return;

    return this.sendRequest('setDatabaseSchemaHash', hash);
  };

  getFilePathById = async (id: string) => {
    return this.sendRequest<string>('getStaticFilePath', id);
  };

  getFileHTTPURL = async (path: string) => {
    return this.sendRequest<string>('getFileHTTPURL', path);
  };

  deleteFiles = async (paths: string[]) => {
    return this.sendRequest<{ errors?: { message: string; path: string }[]; success: boolean }>(
      'deleteFiles',
      paths,
    );
  };

  createFile = async (params: CreateFileParams) => {
    return this.sendRequest<{ metadata: FileMetadata; success: boolean }>('createFile', params);
  };
}

export const electronIpcClient = new LobeHubElectronIpcClient(packageJSON.name);
