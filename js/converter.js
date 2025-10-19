// 전역 변수
let selectedFiles = [];
let convertedFiles = [];

// DOM 요소
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const conversionOptions = document.getElementById('conversionOptions');
const previewSection = document.getElementById('previewSection');
const progressSection = document.getElementById('progressSection');
const batchSection = document.getElementById('batchSection');

const outputFormat = document.getElementById('outputFormat');
const quality = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');

const convertBtn = document.getElementById('convertBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const convertAllBtn = document.getElementById('convertAllBtn');
const downloadAllBtn = document.getElementById('downloadAllBtn');

const originalImage = document.getElementById('originalImage');
const convertedImage = document.getElementById('convertedImage');
const originalInfo = document.getElementById('originalInfo');
const convertedInfo = document.getElementById('convertedInfo');

const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const fileList = document.getElementById('fileList');

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    setupEventListeners();
    setupDragAndDrop();
}

function setupEventListeners() {
    // 파일 입력
    fileInput.addEventListener('change', handleFileSelect);
    
    // 품질 슬라이더
    quality.addEventListener('input', updateQualityDisplay);
    
    // 버튼들
    convertBtn.addEventListener('click', convertSingleImage);
    downloadBtn.addEventListener('click', downloadConvertedImage);
    resetBtn.addEventListener('click', resetApplication);
    convertAllBtn.addEventListener('click', convertAllImages);
    downloadAllBtn.addEventListener('click', downloadAllImages);
    
    // 업로드 영역 클릭
    uploadArea.addEventListener('click', () => fileInput.click());
}

function setupDragAndDrop() {
    // 드래그 앤 드롭 이벤트
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // 전체 페이지 드래그 방지
    document.addEventListener('dragover', preventDefault);
    document.addEventListener('drop', preventDefault);
}

function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    processFiles(files);
}

function handleFileSelect(e) {
    const files = e.target.files;
    processFiles(files);
}

function processFiles(files) {
    selectedFiles = [];
    
    for (let file of files) {
        if (isValidImageFile(file)) {
            if (file.size > 10 * 1024 * 1024) { // 10MB 제한
                showToast(`파일 ${file.name}이 너무 큽니다. (최대 10MB)`, 'error');
                continue;
            }
            selectedFiles.push(file);
        } else {
            showToast(`${file.name}은 지원되지 않는 파일 형식입니다.`, 'error');
        }
    }
    
    if (selectedFiles.length > 0) {
        if (selectedFiles.length === 1) {
            setupSingleImageConversion();
        } else {
            setupBatchConversion();
        }
        conversionOptions.style.display = 'block';
        conversionOptions.classList.add('fade-in');
    }
}

function isValidImageFile(file) {
    const validTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
}

function setupSingleImageConversion() {
    const file = selectedFiles[0];
    
    // 파일 정보 표시
    showImagePreview(file, originalImage, originalInfo);
    
    // 현재 포맷에 따라 기본 변환 포맷 설정
    setDefaultOutputFormat(file.type);
    
    // 배치 섹션 숨기기
    batchSection.style.display = 'none';
}

function setupBatchConversion() {
    // 배치 섹션 표시
    batchSection.style.display = 'block';
    batchSection.classList.add('fade-in');
    
    // 파일 리스트 생성
    displayFileList();
    
    // 미리보기 섹션 숨기기
    previewSection.style.display = 'none';
}

function setDefaultOutputFormat(inputType) {
    // 입력 포맷에 따라 적절한 출력 포맷 제안
    const formatMap = {
        'image/webp': 'jpeg',
        'image/jpeg': 'webp',
        'image/jpg': 'webp',
        'image/png': 'webp',
        'image/gif': 'png'
    };
    
    const suggestedFormat = formatMap[inputType] || 'webp';
    outputFormat.value = suggestedFormat;
}

function showImagePreview(file, imgElement, infoElement) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        imgElement.src = e.target.result;
        imgElement.onload = function() {
            const fileSize = formatFileSize(file.size);
            const dimensions = `${this.naturalWidth} × ${this.naturalHeight}`;
            const fileType = file.type.split('/')[1].toUpperCase();
            
            infoElement.innerHTML = `
                <strong>파일명:</strong> ${file.name}<br>
                <strong>크기:</strong> ${fileSize}<br>
                <strong>해상도:</strong> ${dimensions}<br>
                <strong>포맷:</strong> ${fileType}
            `;
        };
    };
    
    reader.readAsDataURL(file);
}

function displayFileList() {
    fileList.innerHTML = '';
    
    selectedFiles.forEach((file, index) => {
        const fileItem = createFileItem(file, index);
        fileList.appendChild(fileItem);
    });
}

function createFileItem(file, index) {
    const div = document.createElement('div');
    div.className = 'file-item';
    div.innerHTML = `
        <div class="file-info">
            <i class="fas fa-file-image file-icon"></i>
            <div class="file-details">
                <h4>${file.name}</h4>
                <p>${formatFileSize(file.size)} • ${file.type.split('/')[1].toUpperCase()}</p>
            </div>
        </div>
        <div class="file-status status-pending" id="status-${index}">대기중</div>
    `;
    return div;
}

function updateQualityDisplay() {
    qualityValue.textContent = quality.value;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 단일 이미지 변환
async function convertSingleImage() {
    if (selectedFiles.length === 0) return;
    
    const file = selectedFiles[0];
    showProgress();
    
    try {
        updateProgress(20, '이미지 로딩 중...');
        
        const convertedBlob = await convertImage(file, outputFormat.value, quality.value / 100);
        
        updateProgress(80, '변환 완료, 미리보기 생성 중...');
        
        // 변환된 이미지 미리보기
        const convertedUrl = URL.createObjectURL(convertedBlob);
        convertedImage.src = convertedUrl;
        
        // 변환된 이미지 정보 표시
        const img = new Image();
        img.onload = function() {
            const fileSize = formatFileSize(convertedBlob.size);
            const dimensions = `${this.naturalWidth} × ${this.naturalHeight}`;
            const fileType = outputFormat.value.toUpperCase();
            const originalSize = selectedFiles[0].size;
            const compressionRatio = ((originalSize - convertedBlob.size) / originalSize * 100).toFixed(1);
            
            convertedInfo.innerHTML = `
                <strong>파일명:</strong> ${getConvertedFileName(file.name, outputFormat.value)}<br>
                <strong>크기:</strong> ${fileSize}<br>
                <strong>해상도:</strong> ${dimensions}<br>
                <strong>포맷:</strong> ${fileType}<br>
                <strong>압축률:</strong> ${compressionRatio}% 감소
            `;
        };
        img.src = convertedUrl;
        
        // 다운로드 준비
        convertedFiles = [{
            blob: convertedBlob,
            name: getConvertedFileName(file.name, outputFormat.value),
            originalName: file.name
        }];
        
        updateProgress(100, '변환 완료!');
        
        setTimeout(() => {
            hideProgress();
            showPreview();
        }, 500);
        
        showToast('이미지 변환이 완료되었습니다!', 'success');
        
    } catch (error) {
        console.error('변환 오류:', error);
        hideProgress();
        showToast('이미지 변환 중 오류가 발생했습니다.', 'error');
    }
}

// 배치 변환
async function convertAllImages() {
    if (selectedFiles.length === 0) return;
    
    convertedFiles = [];
    const totalFiles = selectedFiles.length;
    
    showProgress();
    
    try {
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const statusElement = document.getElementById(`status-${i}`);
            
            // 상태 업데이트
            statusElement.textContent = '변환중';
            statusElement.className = 'file-status status-processing';
            
            const progressPercent = ((i + 1) / totalFiles) * 100;
            updateProgress(progressPercent, `${i + 1}/${totalFiles} 파일 변환 중...`);
            
            try {
                const convertedBlob = await convertImage(file, outputFormat.value, quality.value / 100);
                
                convertedFiles.push({
                    blob: convertedBlob,
                    name: getConvertedFileName(file.name, outputFormat.value),
                    originalName: file.name
                });
                
                // 성공 상태 업데이트
                statusElement.textContent = '완료';
                statusElement.className = 'file-status status-completed';
                
            } catch (error) {
                console.error(`파일 ${file.name} 변환 오류:`, error);
                statusElement.textContent = '실패';
                statusElement.className = 'file-status status-error';
            }
            
            // 변환 간 짧은 딜레이
            if (i < selectedFiles.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
        
        hideProgress();
        
        if (convertedFiles.length > 0) {
            downloadAllBtn.style.display = 'inline-block';
            showToast(`${convertedFiles.length}개 파일이 성공적으로 변환되었습니다!`, 'success');
        } else {
            showToast('변환된 파일이 없습니다.', 'error');
        }
        
    } catch (error) {
        console.error('배치 변환 오류:', error);
        hideProgress();
        showToast('배치 변환 중 오류가 발생했습니다.', 'error');
    }
}

// 이미지 변환 핵심 함수
async function convertImage(file, targetFormat, qualityValue) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            
            // 이미지 그리기
            ctx.drawImage(img, 0, 0);
            
            // 포맷에 따른 MIME 타입 설정
            let mimeType;
            switch(targetFormat) {
                case 'webp':
                    mimeType = 'image/webp';
                    break;
                case 'jpeg':
                case 'jpg':
                    mimeType = 'image/jpeg';
                    break;
                case 'png':
                    mimeType = 'image/png';
                    qualityValue = undefined; // PNG는 품질 설정 없음
                    break;
                case 'gif':
                    // GIF는 canvas로 직접 변환이 제한적이므로 PNG로 변환
                    mimeType = 'image/png';
                    qualityValue = undefined;
                    break;
                default:
                    mimeType = 'image/png';
                    qualityValue = undefined;
            }
            
            // Canvas를 Blob으로 변환
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('변환 실패'));
                    }
                },
                mimeType,
                qualityValue
            );
        };
        
        img.onerror = () => {
            reject(new Error('이미지 로딩 실패'));
        };
        
        // FileReader로 이미지 로드
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.onerror = () => {
            reject(new Error('파일 읽기 실패'));
        };
        reader.readAsDataURL(file);
    });
}

function getConvertedFileName(originalName, targetFormat) {
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    const extension = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
    return `${nameWithoutExt}_converted.${extension}`;
}

// UI 표시/숨김 함수들
function showProgress() {
    progressSection.style.display = 'block';
    progressSection.classList.add('fade-in');
    updateProgress(0, '준비 중...');
}

function hideProgress() {
    progressSection.style.display = 'none';
}

function updateProgress(percent, text) {
    progressFill.style.width = percent + '%';
    progressText.textContent = text;
}

function showPreview() {
    previewSection.style.display = 'block';
    previewSection.classList.add('fade-in');
}

function hidePreview() {
    previewSection.style.display = 'none';
}

// 다운로드 함수들
function downloadConvertedImage() {
    if (convertedFiles.length === 0) return;
    
    const file = convertedFiles[0];
    downloadBlob(file.blob, file.name);
}

async function downloadAllImages() {
    if (convertedFiles.length === 0) return;
    
    if (convertedFiles.length === 1) {
        downloadConvertedImage();
        return;
    }
    
    // ZIP 파일로 다운로드 (간단한 구현)
    showToast('개별 파일로 다운로드를 시작합니다...', 'success');
    
    for (const file of convertedFiles) {
        await new Promise(resolve => {
            downloadBlob(file.blob, file.name);
            setTimeout(resolve, 500); // 다운로드 간 딜레이
        });
    }
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
}

// 리셋 함수
function resetApplication() {
    selectedFiles = [];
    convertedFiles = [];
    
    // UI 초기화
    conversionOptions.style.display = 'none';
    previewSection.style.display = 'none';
    progressSection.style.display = 'none';
    batchSection.style.display = 'none';
    downloadAllBtn.style.display = 'none';
    
    // 파일 입력 초기화
    fileInput.value = '';
    
    // 이미지 초기화
    originalImage.src = '';
    convertedImage.src = '';
    originalInfo.innerHTML = '';
    convertedInfo.innerHTML = '';
    
    showToast('초기화되었습니다.', 'success');
}

// 토스트 메시지
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${getToastIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // 애니메이션 표시
    setTimeout(() => toast.classList.add('show'), 100);
    
    // 자동 제거
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// WebP 지원 확인
function checkWebPSupport() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    const supported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
    if (!supported) {
        showToast('이 브라우저는 WebP 포맷을 완전히 지원하지 않을 수 있습니다.', 'warning');
    }
    
    return supported;
}

// 초기화 시 WebP 지원 확인
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(checkWebPSupport, 1000);
});

// 드래그 상태 시각적 피드백
let dragCounter = 0;

document.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragCounter++;
    if (dragCounter === 1) {
        document.body.style.borderLeft = '5px solid #667eea';
    }
});

document.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) {
        document.body.style.borderLeft = '';
    }
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    dragCounter = 0;
    document.body.style.borderLeft = '';
});

// 키보드 단축키
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'o':
                e.preventDefault();
                fileInput.click();
                break;
            case 'Enter':
                if (selectedFiles.length > 0) {
                    e.preventDefault();
                    if (selectedFiles.length === 1) {
                        convertSingleImage();
                    } else {
                        convertAllImages();
                    }
                }
                break;
            case 'r':
                e.preventDefault();
                resetApplication();
                break;
        }
    }
});