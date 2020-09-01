# -*- mode: python ; coding: utf-8 -*-

block_cipher = None


a = Analysis(['python_src/run.py'],
             pathex=['/home/emirhantaze/GitHub/electronmeepproject'],
             binaries=[("/home/emirhantaze/miniconda3/envs/mp_test/lib/libblas.so.3",".")],
             datas=[],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='python_dist',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               upx_exclude=[],
               name='python_dist')
